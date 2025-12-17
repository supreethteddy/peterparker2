import { useState } from 'react';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import BottomNav from '../../components/feature/BottomNav';
import { HiBell, HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiGift, HiClock } from 'react-icons/hi';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'promotion';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Trip Completed',
      message: 'Your valet service has been completed successfully. Rate your experience!',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'promotion',
      title: 'New Offer Available',
      message: 'Get 20% off on your next booking. Use code WEEKEND20',
      time: '5 hours ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Payment Successful',
      message: 'Your payment of ₹120 has been processed successfully',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Trip Reminder',
      message: 'Your scheduled valet service starts in 30 minutes',
      time: '2 days ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Insurance Claim Approved',
      message: 'Your insurance claim has been approved. Refund will be processed soon.',
      time: '3 days ago',
      isRead: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="w-5 h-5 text-secondary-accent" />;
      case 'warning':
        return <HiExclamationCircle className="w-5 h-5 text-status-warning" />;
      case 'promotion':
        return <HiGift className="w-5 h-5 text-primary-accent" />;
      default:
        return <HiInformationCircle className="w-5 h-5 text-primary-accent" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-secondary-accent/10';
      case 'warning':
        return 'bg-status-warning/10';
      case 'promotion':
        return 'bg-primary-accent/10';
      default:
        return 'bg-primary-accent/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header title="Notifications" />
      
      <div className="pt-20 pb-24 px-6 max-w-md mx-auto">
        {/* Header Stats */}
        {unreadCount > 0 && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-primary-accent to-secondary-accent text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HiBell className="w-6 h-6" />
                <div>
                  <p className="text-body font-semibold">{unreadCount} Unread</p>
                  <p className="text-caption opacity-90">You have new notifications</p>
                </div>
              </div>
              <Badge variant="neutral" size="md" className="bg-white/20 text-white border-white/30">
                {unreadCount}
              </Badge>
            </div>
          </Card>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 ${!notification.isRead ? 'border-l-4 border-l-primary-accent' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`text-body font-semibold ${notification.isRead ? 'text-primary-dark' : 'text-primary-dark'}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-primary-accent flex-shrink-0 mt-2 ml-2" />
                    )}
                  </div>
                  <p className="text-caption text-neutral-600 mb-2">{notification.message}</p>
                  <div className="flex items-center gap-2 text-caption text-neutral-500">
                    <HiClock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <HiBell className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-h2 font-semibold text-primary-dark mb-2">No notifications</h3>
            <p className="text-body text-neutral-600">
              You're all caught up! We'll notify you about important updates.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
