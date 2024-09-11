"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, CircleAlert, Info } from "lucide-react";

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
  warning: CircleAlert,
  info: Info,
};

const alertColors = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
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
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 mb-4 text-white rounded-lg shadow-lg ${alertColors[type]}`}
          role="alert"
        >
          <Icon className="flex-shrink-0 w-5 h-5 mr-2" />
          <span className="sr-only">{type}:</span>
          <div className="text-sm font-medium">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
