
import { RouteObject } from 'react-router-dom';
import SplashPage from '../pages/splash/page';
import HomePage from '../pages/home/page';
import WelcomePage from '../pages/welcome/page';
import LoginPage from '../pages/login/page';
import SignUpPage from '../pages/signup/page';
import VerifyOTPPage from '../pages/verify-otp/page';
import SetPasswordPage from '../pages/set-password/page';
import SendVerificationPage from '../pages/send-verification/page';
import PhoneVerifyOTPPage from '../pages/phone-verify-otp/page';
import SetNewPasswordPage from '../pages/set-new-password/page';
import ProfileSetupPage from '../pages/profile-setup/page';
import VehicleSetupPage from '../pages/vehicle-setup/page';
import PaymentSetupPage from '../pages/payment-setup/page';
import InsuranceSetupPage from '../pages/insurance-setup/page';
import SelectLocationPage from '../pages/select-location/page';
import RequestPage from '../pages/request/page';
import SearchingValetPage from '../pages/searching-valet/page';
import ValetAssignedPage from '../pages/valet-assigned/page';
import ConfirmPickupPage from '../pages/confirm-pickup/page';
import ValetEnroutePage from '../pages/valet-enroute/page';
import HandoverPage from '../pages/handover/page';
import ParkingPage from '../pages/parking/page';
import ParkingListPage from '../pages/parking-list/page';
import ReturnPage from '../pages/return/page';
import PaymentPage from '../pages/payment/page';
import ReviewPage from '../pages/review/page';
import MessagePage from '../pages/message/page';
import CallingPage from '../pages/calling/page';
import HistoryPage from '../pages/history/page';
import WalletPage from '../pages/wallet/page';
import AddAmountPage from '../pages/wallet/add-amount/page';
import AddBankPage from '../pages/wallet/add-bank/page';
import WalletSuccessPage from '../pages/wallet/success/page';
import SupportPage from '../pages/support/page';
import ProfilePage from '../pages/profile/page';
import TripDetailsPage from '../pages/trip-details/page';
import PromotionsPage from '../pages/promotions/page';
import SavedAddressesPage from '../pages/saved-addresses/page';
import NotificationsPage from '../pages/notifications/page';
import SettingsPage from '../pages/settings/page';
import EmergencyPage from '../pages/emergency/page';
import ErrorPage from '../pages/error/page';
import VerificationPage from '../pages/verification/page';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SplashPage />
  },
  {
    path: '/splash',
    element: <SplashPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/select-location',
    element: <SelectLocationPage />
  },
  {
    path: '/welcome',
    element: <WelcomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/verify-otp',
    element: <VerifyOTPPage />
  },
  {
    path: '/set-password',
    element: <SetPasswordPage />
  },
  {
    path: '/send-verification',
    element: <SendVerificationPage />
  },
  {
    path: '/phone-verify-otp',
    element: <PhoneVerifyOTPPage />
  },
  {
    path: '/set-new-password',
    element: <SetNewPasswordPage />
  },
  {
    path: '/forgot-password',
    element: <SendVerificationPage />
  },
  {
    path: '/profile-setup',
    element: <ProfileSetupPage />
  },
  {
    path: '/vehicle-setup',
    element: <VehicleSetupPage />
  },
  {
    path: '/payment-setup',
    element: <PaymentSetupPage />
  },
  {
    path: '/insurance-setup',
    element: <InsuranceSetupPage />
  },
  {
    path: '/request',
    element: <RequestPage />
  },
  {
    path: '/searching-valet',
    element: <SearchingValetPage />
  },
  {
    path: '/valet-assigned',
    element: <ValetAssignedPage />
  },
  {
    path: '/confirm-pickup',
    element: <ConfirmPickupPage />
  },
  {
    path: '/valet-enroute',
    element: <ValetEnroutePage />
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
    path: '/parking-list',
    element: <ParkingListPage />
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
    path: '/review',
    element: <ReviewPage />
  },
  {
    path: '/message',
    element: <MessagePage />
  },
  {
    path: '/calling',
    element: <CallingPage />
  },
  {
    path: '/history',
    element: <HistoryPage />
  },
  {
    path: '/wallet',
    element: <WalletPage />
  },
  {
    path: '/wallet/add-amount',
    element: <AddAmountPage />
  },
  {
    path: '/wallet/add-bank',
    element: <AddBankPage />
  },
  {
    path: '/wallet/success',
    element: <WalletSuccessPage />
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
    path: '/trip-details',
    element: <TripDetailsPage />
  },
  {
    path: '/promotions',
    element: <PromotionsPage />
  },
  {
    path: '/saved-addresses',
    element: <SavedAddressesPage />
  },
  {
    path: '/notifications',
    element: <NotificationsPage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '/emergency',
    element: <EmergencyPage />
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
