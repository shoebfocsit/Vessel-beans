import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Thermometer, Scale, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface BrewMethod {
  id: string;
  name: string;
  grind: string;
  temp: number;
  totalTime: number; // in seconds
  ratio: number; // 1:ratio
  steps: {
    time: number; // timestamp in seconds where step ends
    title: string;
    waterPour: string;
    instructions: string;
  }[];
}

const BREW_METHODS: BrewMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60 Ceramic',
    grind: 'Medium-Fine (like kosher salt)',
    temp: 93,
    totalTime: 180, // 3:00
    ratio: 16,
    steps: [
      { time: 45, title: 'The Bloom', waterPour: '50g water', instructions: 'Pour 50g in gentle spirals from center outward. Let the coffee bloom and release trapped CO2 for 45s.' },
      { time: 90, title: 'First Continuous Pour', waterPour: 'Pour to 60% total', instructions: 'Pour slowly in smooth concentric circles, avoiding the paper filter edges.' },
      { time: 135, title: 'Second Pour to Target', waterPour: 'Top to full weight', instructions: 'Bring water to target weight with a steady stream, keeping water bed level.' },
      { time: 180, title: 'Drawdown & Swirl', waterPour: 'Gravity finish', instructions: 'Give carafe a gentle single swirl to create a flat bed. Wait for clean final drawdown.' },
    ],
  },
  {
    id: 'chemex',
    name: 'Chemex 6-Cup Glass',
    grind: 'Medium-Coarse (sea salt)',
    temp: 94,
    totalTime: 240, // 4:00
    ratio: 16,
    steps: [
      { time: 60, title: 'Generous Bloom', waterPour: '80g water', instructions: 'Evenly saturate thick triple-fold Chemex filter. Swirl gently to eliminate dry pockets.' },
      { time: 130, title: 'Main Center Pour', waterPour: 'Pour to 50%', instructions: 'Gentle center pour keeping water level 1 inch below the glass rim.' },
      { time: 190, title: 'Final Pour', waterPour: 'Top to target', instructions: 'Fill smoothly to final water volume.' },
      { time: 240, title: 'Drawdown', waterPour: 'Filter drain', instructions: 'Let thick paper filter extract crystalline clarity. Discard filter and aerate carafe.' },
    ],
  },
  {
    id: 'aeropress',
    name: 'Aeropress (Inverted)',
    grind: 'Fine-Medium (table salt)',
    temp: 88,
    totalTime: 120, // 2:00
    ratio: 14,
    steps: [
      { time: 30, title: 'Inverted Infusion', waterPour: '100g water', instructions: 'Add freshly ground coffee to inverted Aeropress. Pour 100g water and stir vigorously.' },
      { time: 60, title: 'Top-Off & Cap', waterPour: 'Pour remaining', instructions: 'Fill to target weight, attach rinsed paper filter cap, and expel excess air.' },
      { time: 90, title: 'Steep & Flip', waterPour: 'Full immersion', instructions: 'Wait until 1:30, then carefully flip Aeropress onto your ceramic mug.' },
      { time: 120, title: 'Gentle Press', waterPour: '30s plunge', instructions: 'Press plunger down steadily for 30 seconds until you hear the soft hiss.' },
    ],
  },
  {
    id: 'french-press',
    name: 'French Press (Immersion)',
    grind: 'Coarse (breadcrumb texture)',
    temp: 95,
    totalTime: 240, // 4:00
    ratio: 15,
    steps: [
      { time: 60, title: 'Saturate & Wet', waterPour: 'Full water volume', instructions: 'Pour entire water amount over grounds, making sure all coffee is wet.' },
      { time: 180, title: 'Break the Crust', waterPour: 'Gentle stir', instructions: 'At 3:00, use a spoon to break floating crust. Scoop off pale surface foam for cleaner cup.' },
      { time: 240, title: 'Plunge & Decant', waterPour: 'Press filter', instructions: 'Insert plunger and press down gently. Decant immediately into mugs so it does not over-extract.' },
    ],
  },
];

export const BrewGuideSection: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('v60');
  const [cups, setCups] = useState<number>(1);
  const [ratioOffset, setRatioOffset] = useState<number>(16); // 1:16 default
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const method = BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];

  // Water & Coffee Dose Calculations
  const waterWeight = cups * 250; // grams (e.g. 250ml per cup)
  const coffeeDose = (waterWeight / ratioOffset).toFixed(1);

  // Audio synthesis chime using Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.85);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev + 1;
          // Check if a step boundary was crossed
          const crossed = method.steps.some((s) => s.time === next);
          if (crossed) {
            playChime();
          }
          if (next >= method.totalTime) {
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return method.totalTime;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, method.totalTime, soundEnabled]);

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Current active step
  const activeStepIndex = method.steps.findIndex((s) => timerSeconds < s.time);
  const currentStep = activeStepIndex !== -1 ? method.steps[activeStepIndex] : method.steps[method.steps.length - 1];

  const progressPercent = Math.min(100, (timerSeconds / method.totalTime) * 100);

  return (
    <section id="brew-guide" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#9C6644] font-semibold block mb-2">
            The Barista's Laboratory
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#231C16] tracking-tight">
            Interactive Pour-Over Calculator & Live Timer
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#7E7267]">
            Recreate cafe-grade clarity at home. Select your gear, dial your cup volume, and follow our live timer guidance with audio cues.
          </p>
        </div>

        {/* Brewing Apparatus Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {BREW_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMethodId(m.id);
                handleResetTimer();
              }}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                selectedMethodId === m.id
                  ? 'bg-[#231C16] text-white shadow-xs font-semibold'
                  : 'bg-[#FFFFFF] text-[#7E7267] hover:text-[#231C16] border border-[#E8DFD5]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* 2-Column Module: Setup Parameters & Live Timer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Controls */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl p-6 space-y-6 shadow-xs">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#9C6644] font-semibold mb-1">
                Extraction Ratios & Dosing
              </div>
              <h3 className="text-xl font-serif text-[#231C16]">
                {method.name} Parameters
              </h3>
            </div>

            {/* Cups Scaler */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#231C16] mb-2">
                <span>Serving Size</span>
                <span className="text-[#9C6644] font-mono tabular-nums">{cups} Cup{cups > 1 ? 's' : ''} ({waterWeight}ml)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setCups(num);
                      handleResetTimer();
                    }}
                    className={`py-2 text-xs font-medium rounded-md border transition-all ${
                      cups === num
                        ? 'border-[#9C6644] bg-[#FAF7F2] text-[#231C16] font-semibold'
                        : 'border-[#E8DFD5] text-[#7E7267] hover:border-[#D8CCC0]'
                    }`}
                  >
                    {num} Cup{num > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Ratio Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#231C16] mb-2">
                <span>Brew Ratio</span>
                <span className="font-mono tabular-nums text-[#9C6644]">1 : {ratioOffset}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { r: 15, label: 'Bold (1:15)' },
                  { r: 16, label: 'Balanced (1:16)' },
                  { r: 17, label: 'Delicate (1:17)' },
                ].map((item) => (
                  <button
                    key={item.r}
                    onClick={() => setRatioOffset(item.r)}
                    className={`py-1.5 px-2 rounded-md border text-center transition-all ${
                      ratioOffset === item.r
                        ? 'border-[#9C6644] bg-[#FAF7F2] text-[#231C16] font-semibold'
                        : 'border-[#E8DFD5] text-[#7E7267]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Output Badges */}
            <div className="p-4 bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#7E7267] block text-[11px]">Coffee Ground Dose</span>
                <span className="font-mono tabular-nums text-base font-semibold text-[#231C16]">
                  {coffeeDose}g
                </span>
              </div>

              <div>
                <span className="text-[#7E7267] block text-[11px]">Target Water Weight</span>
                <span className="font-mono tabular-nums text-base font-semibold text-[#231C16]">
                  {waterWeight}g
                </span>
              </div>

              <div>
                <span className="text-[#7E7267] block text-[11px]">Water Temperature</span>
                <span className="font-mono tabular-nums text-sm font-medium text-[#231C16]">
                  {method.temp}°C / {(method.temp * 1.8 + 32).toFixed(0)}°F
                </span>
              </div>

              <div>
                <span className="text-[#7E7267] block text-[11px]">Grind Size</span>
                <span className="text-xs font-medium text-[#231C16]">
                  {method.grind}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Brew Timer */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8DFD5] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Top Bar with Sound Toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5]">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#9C6644] font-semibold">
                  Phase-Guided Pouring
                </div>
                <h3 className="text-xl font-serif text-[#231C16]">
                  Live Pouring Assistant
                </h3>
              </div>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 text-[#7E7267] hover:text-[#231C16] hover:bg-[#FAF7F2] rounded-md transition-colors"
                title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
                aria-label="Toggle brew sound cues"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#9C6644]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#7E7267]" />
                )}
              </button>
            </div>

            {/* Big Timer Clock */}
            <div className="text-center py-4">
              <div className="font-mono tabular-nums text-5xl sm:text-6xl font-medium tracking-tight text-[#231C16] mb-2">
                {formatTime(timerSeconds)}
              </div>
              <div className="text-xs text-[#7E7267]">
                Target extraction time: <span className="font-mono tabular-nums">{formatTime(method.totalTime)}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full bg-[#FAF7F2] border border-[#E8DFD5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#9C6644] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Timer Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2 ${
                  isRunning
                    ? 'bg-[#9C6644] text-white hover:bg-[#854F33]'
                    : 'bg-[#231C16] text-white hover:bg-[#3E3228]'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Extraction</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>{timerSeconds > 0 ? 'Resume Timer' : 'Start Pour-Over'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                className="px-4 py-2.5 rounded-md text-xs font-medium text-[#7E7267] hover:text-[#231C16] bg-[#FAF7F2] hover:bg-[#E8DFD5] border border-[#E8DFD5] transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Current Step Instruction Banner */}
            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#9C6644] uppercase tracking-wider">
                  Current Phase: {currentStep.title}
                </span>
                <span className="font-mono text-[11px] text-[#7E7267]">
                  {currentStep.waterPour}
                </span>
              </div>
              <p className="text-xs text-[#231C16] leading-relaxed">
                {currentStep.instructions}
              </p>
            </div>

            {/* Steps Timeline Overview */}
            <div className="space-y-2 pt-2 border-t border-[#E8DFD5]">
              <span className="text-[11px] uppercase tracking-wider text-[#7E7267] font-semibold block">
                Extraction Timeline Stages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {method.steps.map((st, idx) => {
                  const isCurrent = currentStep.title === st.title && timerSeconds < st.time && (idx === 0 || timerSeconds >= method.steps[idx - 1].time);
                  const isDone = timerSeconds >= st.time;
                  return (
                    <div
                      key={st.title}
                      className={`p-2.5 rounded-md border text-xs transition-colors ${
                        isCurrent
                          ? 'border-[#9C6644] bg-[#FFFFFF] shadow-xs'
                          : isDone
                          ? 'border-[#E8DFD5] bg-[#FAF7F2]/60 opacity-60'
                          : 'border-[#E8DFD5] bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#7E7267] mb-1">
                        <span>Stage {idx + 1}</span>
                        <span>0:{st.time < 10 ? '0' : ''}{st.time}</span>
                      </div>
                      <div className="font-medium text-[#231C16]">{st.title}</div>
                      <div className="text-[11px] text-[#7E7267]">{st.waterPour}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
