"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, AlertCircle, Info } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  message: string;
  type: AlertType;
  duration?: number;
  onClose?: () => void;
}

const alertIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertCircle,
  info: Info,
};

const alertStyles = {
  success: "bg-green-100 border-green-500 text-green-700",
  error: "bg-red-100 border-red-500 text-red-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
};

export default function Alert({
  message,
  type,
  duration = 3000,
  onClose,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = alertIcons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-x-0 top-4 z-50 flex justify-center items-center px-4"
        >
          <div
            className={`max-w-md w-full flex items-center p-4 rounded-lg shadow-lg border-l-4 ${alertStyles[type]}`}
            role="alert"
          >
            <Icon className="flex-shrink-0 w-5 h-5 mr-3" />
            <div className="flex-grow text-sm font-medium">{message}</div>
            <button
              onClick={() => {
                setIsVisible(false);
                onClose && onClose();
              }}
              className="ml-3 inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-full focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XCircleIcon className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
