
import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import OnboardingPage from '../pages/onboarding/page';
import RequestPage from '../pages/request/page';
import HandoverPage from '../pages/handover/page';
import ParkingPage from '../pages/parking/page';
import ReturnPage from '../pages/return/page';
import PaymentPage from '../pages/payment/page';
import HistoryPage from '../pages/history/page';
import SupportPage from '../pages/support/page';
import ProfilePage from '../pages/profile/page';
import ErrorPage from '../pages/error/page';
import VerificationPage from '../pages/verification/page';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />
  },
  {
    path: '/request',
    element: <RequestPage />
  },
  {
    path: '/handover',
    element: <HandoverPage />
  },
  {
    path: '/parking',
    element: <ParkingPage />
  },
  {
    path: '/return',
    element: <ReturnPage />
  },
  {
    path: '/payment',
    element: <PaymentPage />
  },
  {
    path: '/history',
    element: <HistoryPage />
  },
  {
    path: '/support',
    element: <SupportPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/error/no-valets',
    element: <ErrorPage type="no-valets" />
  },
  {
    path: '/error/driver-cancelled',
    element: <ErrorPage type="driver-cancelled" />
  },
  {
    path: '/error/verification-failed',
    element: <ErrorPage type="verification-failed" />
  },
  {
    path: '/error/payment-declined',
    element: <ErrorPage type="payment-declined" />
  },
  {
    path: '/verification',
    element: <VerificationPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
