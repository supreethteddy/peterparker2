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
import EditProfilePage from '../pages/edit-profile/page';
import VehicleDetailsPage from '../pages/vehicle-details/page';
import PaymentMethodsPage from '../pages/payment-methods/page';
import InsuranceSettingsPage from '../pages/insurance-settings/page';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: SplashPage
  },
  {
    path: '/splash',
    Component: SplashPage
  },
  {
    path: '/home',
    Component: HomePage
  },
  {
    path: '/select-location',
    Component: SelectLocationPage
  },
  {
    path: '/welcome',
    Component: WelcomePage
  },
  {
    path: '/login',
    Component: LoginPage
  },
  {
    path: '/signup',
    Component: SignUpPage
  },
  {
    path: '/verify-otp',
    Component: VerifyOTPPage
  },
  {
    path: '/set-password',
    Component: SetPasswordPage
  },
  {
    path: '/send-verification',
    Component: SendVerificationPage
  },
  {
    path: '/phone-verify-otp',
    Component: PhoneVerifyOTPPage
  },
  {
    path: '/set-new-password',
    Component: SetNewPasswordPage
  },
  {
    path: '/forgot-password',
    Component: SendVerificationPage
  },
  {
    path: '/profile-setup',
    Component: ProfileSetupPage
  },
  {
    path: '/vehicle-setup',
    Component: VehicleSetupPage
  },
  {
    path: '/payment-setup',
    Component: PaymentSetupPage
  },
  {
    path: '/insurance-setup',
    Component: InsuranceSetupPage
  },
  {
    path: '/request',
    Component: RequestPage
  },
  {
    path: '/searching-valet',
    Component: SearchingValetPage
  },
  {
    path: '/valet-assigned',
    Component: ValetAssignedPage
  },
  {
    path: '/confirm-pickup',
    Component: ConfirmPickupPage
  },
  {
    path: '/valet-enroute',
    Component: ValetEnroutePage
  },
  {
    path: '/handover',
    Component: HandoverPage
  },
  {
    path: '/parking',
    Component: ParkingPage
  },
  {
    path: '/parking-list',
    Component: ParkingListPage
  },
  {
    path: '/return',
    Component: ReturnPage
  },
  {
    path: '/payment',
    Component: PaymentPage
  },
  {
    path: '/review',
    Component: ReviewPage
  },
  {
    path: '/message',
    Component: MessagePage
  },
  {
    path: '/calling',
    Component: CallingPage
  },
  {
    path: '/history',
    Component: HistoryPage
  },
  {
    path: '/wallet',
    Component: WalletPage
  },
  {
    path: '/wallet/add-amount',
    Component: AddAmountPage
  },
  {
    path: '/wallet/add-bank',
    Component: AddBankPage
  },
  {
    path: '/wallet/success',
    Component: WalletSuccessPage
  },
  {
    path: '/support',
    Component: SupportPage
  },
  {
    path: '/profile',
    Component: ProfilePage
  },
  {
    path: '/trip-details',
    Component: TripDetailsPage
  },
  {
    path: '/promotions',
    Component: PromotionsPage
  },
  {
    path: '/saved-addresses',
    Component: SavedAddressesPage
  },
  {
    path: '/notifications',
    Component: NotificationsPage
  },
  {
    path: '/settings',
    Component: SettingsPage
  },
  {
    path: '/emergency',
    Component: EmergencyPage
  },
  {
    path: '/edit-profile',
    Component: EditProfilePage
  },
  {
    path: '/vehicle-details',
    Component: VehicleDetailsPage
  },
  {
    path: '/payment-methods',
    Component: PaymentMethodsPage
  },
  {
    path: '/insurance-settings',
    Component: InsuranceSettingsPage
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
    Component: VerificationPage
  },
  {
    path: '*',
    Component: NotFound
  }
];

export default routes;
