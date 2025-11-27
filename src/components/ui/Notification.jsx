/**
 * Notification Component
 * Simple toast-style notifications
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ message, type = 'info', onClose, visible = true }) => {
  if (!visible || !message) return null;

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const Icon = icons[type] || icons.info;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-20 right-4 z-50 ${colors[type]} border rounded-lg shadow-lg p-4 max-w-md flex items-start gap-3`}
        >
          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="flex-1 text-sm font-medium">{message}</p>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 text-current opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;

