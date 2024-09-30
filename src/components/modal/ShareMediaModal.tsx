import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";

interface ShareMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  masjidName: string;
  masjidSlug: string;
}

export function ShareMediaModal({
  isOpen,
  onClose,
  masjidName,
  masjidSlug,
}: ShareMediaModalProps) {
  const [copied, setCopied] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const shareUrl = `https://masjidinfo.my.id/detailmasjids/${masjidSlug}`;
  const title = `Kunjungi ${masjidName}`;

  const socialMedias = [
    {
      name: "Facebook",
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      color: "#1877F2",
    },
    {
      name: "Twitter",
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      color: "#1DA1F2",
    },
    {
      name: "WhatsApp",
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
      color: "#25D366",
    },
    {
      name: "Telegram",
      Button: TelegramShareButton,
      Icon: TelegramIcon,
      color: "#0088cc",
    },
    {
      name: "LinkedIn",
      Button: LinkedinShareButton,
      Icon: LinkedinIcon,
      color: "#0A66C2",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (isOpen) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Share {masjidName}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence>
              {socialMedias.map(({ name, Button, Icon, color }, index) => (
                <motion.div
                  key={`${name}-${animationKey}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button url={shareUrl} title={title}>
                    <div className="flex flex-col items-center">
                      <Icon
                        size={40}
                        round
                        className="hover:scale-110 transition-transform duration-200"
                      />
                      <span className="text-xs mt-1" style={{ color }}>
                        {name}
                      </span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="w-full sm:flex-grow">
              <Input
                value={shareUrl}
                readOnly
                className="w-full text-sm bg-gray-100 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <Button
              onClick={copyToClipboard}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white transition-colors duration-200"
            >
              {copied ? (
                <>
                  <IconCheck className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-4 w-4" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
