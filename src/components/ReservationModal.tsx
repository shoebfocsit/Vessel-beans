import React, { useState } from 'react';
import { X, Calendar, Check, Clock, User, Coffee } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('2026-10-05');
  const [time, setTime] = useState('10:00');
  const [guests, setGuests] = useState(2);
  const [type, setType] = useState<'Table Seating' | 'Sensory Cupping Flight'>('Table Seating');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#231C16]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-lg w-full rounded-xl border border-[#E8DFD5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#9C6644]">
              Vessel & Bean Reservations
            </div>
            <h2 className="text-xl font-serif text-[#231C16]">
              {confirmed ? 'Reservation Confirmed' : 'Reserve a Table or Cupping Flight'}
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#7E7267] hover:text-[#231C16] hover:bg-[#F4EFEA] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#231C16]">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-xs text-[#7E7267] max-w-md mx-auto leading-relaxed">
              A confirmation has been recorded for <strong>{name}</strong> for <strong>{guests} guests</strong> on{' '}
              <strong>{date} at {time}</strong> ({type}).
            </p>

            <div className="p-4 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-[#7E7267]">Confirmation Code:</span>
                <span className="font-mono font-semibold text-[#231C16]">VB-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E7267]">Experience:</span>
                <span className="font-medium text-[#231C16]">{type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E7267]">Location:</span>
                <span className="font-medium text-[#231C16]">418 Roaster's Alley</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            {/* Experience Type */}
            <div>
              <label className="block text-xs font-semibold text-[#231C16] mb-2 uppercase tracking-wider">
                Experience Type
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Table Seating', label: 'Quiet Table Seating', sub: 'Complimentary' },
                  { id: 'Sensory Cupping Flight', label: 'Cupping Flight', sub: '$25 / guest' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id as any)}
                    className={`p-3 rounded-md border text-left transition-all ${
                      type === item.id
                        ? 'border-[#9C6644] bg-[#FFFFFF] shadow-xs'
                        : 'border-[#E8DFD5] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="font-semibold text-[#231C16]">{item.label}</div>
                    <div className="text-[11px] text-[#7E7267]">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#231C16] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Liam Foster"
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231C16] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. liam@example.com"
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#231C16] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231C16] mb-1">
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
                >
                  <option value="08:00">08:00 AM</option>
                  <option value="09:30">09:30 AM</option>
                  <option value="10:00">10:00 AM (Cupping)</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:30">03:30 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231C16] mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-2.5 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5 Guests</option>
                  <option value={6}>6 Guests</option>
                </select>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-semibold text-[#231C16] mb-1">
                Seating Notes or Dietary Preferences (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Window armchair preferred, oat milk only, celebrating a birthday..."
                className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
              ></textarea>
            </div>

            <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#7E7267] hover:text-[#231C16]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
