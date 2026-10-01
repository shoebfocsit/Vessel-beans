import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Check, Coffee, ArrowRight } from 'lucide-react';

export interface TrayItem {
  id: string; // unique item instance id
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  customOptions?: {
    milk?: string;
    temp?: string;
  };
  image?: string;
}

interface TastingTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TrayItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export const TastingTrayDrawer: React.FC<TastingTrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
}) => {
  const [orderType, setOrderType] = useState<'Dine-In' | 'Takeaway Pickup'>('Dine-In');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [baristaNotes, setBaristaNotes] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    const num = `VB-${Math.floor(100 + Math.random() * 900)}`;
    setOrderNumber(num);
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    onClearTray();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#231C16]/50 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl border-l border-[#E8DFD5] flex flex-col justify-between animate-slide-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E8DFD5] bg-[#FFFFFF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#9C6644]" />
            <h2 className="text-lg font-serif font-medium text-[#231C16]">
              Your Tasting Tray
            </h2>
            <span className="text-xs font-mono tabular-nums text-[#7E7267]">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7E7267] hover:text-[#231C16] hover:bg-[#F4EFEA] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {orderPlaced ? (
          <div className="p-8 text-center my-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-[#231C16]">
              Order Poured & Queued
            </h3>
            <p className="text-xs text-[#7E7267] leading-relaxed max-w-xs mx-auto">
              Our baristas have received your order ticket and are grinding your coffee fresh on our flat burr grinder.
            </p>

            <div className="p-4 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#7E7267]">Order Ticket:</span>
                <span className="font-mono font-bold text-[#9C6644]">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E7267]">Service Mode:</span>
                <span className="font-medium text-[#231C16]">{orderType} {orderType === 'Dine-In' ? `(${tableNumber})` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E7267]">Estimated Extraction:</span>
                <span className="font-medium text-[#231C16]">5 – 7 minutes</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#FAF7F2]">
                <span className="text-[#7E7267]">Total Paid:</span>
                <span className="font-mono tabular-nums font-semibold text-[#231C16]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center my-auto space-y-3">
            <Coffee className="w-10 h-10 text-[#D8CCC0] mx-auto" />
            <h3 className="text-lg font-serif text-[#231C16]">Your tray is empty</h3>
            <p className="text-xs text-[#7E7267] max-w-xs mx-auto">
              Explore our single-origin pour-overs, handcrafted espresso beverages, or retail whole bean bags to add them here.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 text-xs font-semibold text-[#231C16] bg-[#FFFFFF] hover:bg-[#F4EFEA] border border-[#E8DFD5] rounded-md"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto p-6 space-y-4 flex-1">
            {/* Service Mode Selector */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['Dine-In', 'Takeaway Pickup'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setOrderType(mode)}
                  className={`py-2 px-3 rounded-md border text-center transition-all ${
                    orderType === mode
                      ? 'border-[#9C6644] bg-[#FFFFFF] text-[#231C16] font-semibold shadow-2xs'
                      : 'border-[#E8DFD5] text-[#7E7267]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {orderType === 'Dine-In' && (
              <div>
                <label className="block text-[11px] font-semibold text-[#7E7267] uppercase tracking-wider mb-1">
                  Table / Seating Area
                </label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16]"
                >
                  <option value="Table 1 (Window)">Table 1 (Window)</option>
                  <option value="Table 2 (Window)">Table 2 (Window)</option>
                  <option value="Table 4 (Cedar Bench)">Table 4 (Cedar Bench)</option>
                  <option value="Table 7 (Corner Oak)">Table 7 (Corner Oak)</option>
                  <option value="Bar Stool 3">Bar Stool 3 (Front Counter)</option>
                </select>
              </div>
            )}

            {/* List of items */}
            <div className="space-y-3 pt-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#FFFFFF] border border-[#E8DFD5] rounded-lg flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-[#231C16]">
                      {item.name}
                    </h4>

                    {/* Options (milk, temperature) */}
                    {(item.customOptions?.milk || item.customOptions?.temp) && (
                      <div className="text-[11px] text-[#9C6644]">
                        {[item.customOptions.temp, item.customOptions.milk].filter(Boolean).join(' · ')}
                      </div>
                    )}

                    <div className="text-xs font-mono tabular-nums text-[#7E7267]">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#7E7267] hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E8DFD5] rounded-md bg-[#FAF7F2]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-[#E8DFD5] text-[#231C16] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono tabular-nums font-semibold text-[#231C16]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-[#E8DFD5] text-[#231C16] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note to Barista */}
            <div>
              <label className="block text-[11px] font-semibold text-[#7E7267] uppercase tracking-wider mb-1">
                Note to Barista (Optional)
              </label>
              <input
                type="text"
                value={baristaNotes}
                onChange={(e) => setBaristaNotes(e.target.value)}
                placeholder="e.g. Extra hot, lightly sweetened, ceramic mug..."
                className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#E8DFD5] rounded-md text-[#231C16] focus:border-[#9C6644] focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* Drawer Footer with Totals */}
        {!orderPlaced && items.length > 0 && (
          <div className="p-6 bg-[#FFFFFF] border-t border-[#E8DFD5] space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs text-[#7E7267]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#231C16] font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Local Tax (8%)</span>
                <span className="font-mono tabular-nums text-[#231C16] font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#231C16] pt-1 border-t border-[#FAF7F2]">
                <span>Total</span>
                <span className="font-mono tabular-nums text-[#9C6644] text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#231C16] hover:bg-[#3E3228] rounded-md transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Send Order to Barista (${total.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
