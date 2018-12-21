
import Spalsh from '../pages/Spalsh/Spalsh';
import Login from '../pages/Login/Login';
import LanguageView from '../pages/Login/LanguageView';
import Home from '../pages/Home/Home';
import FullView from '../pages/FullView/FullView';
import SiteDetail from '../pages/FullView/SiteDetail';
import HistoryView from '../pages/FullView/HistoryView';
import Events from '../pages/Events/Events';
import Setting from '../pages/Setting/Setting';
import UpgradeVersionView from '../pages/Setting/UpgradeVersionView';
import EventDetail from '../pages/Events/EventDetail';
import ScanView from '../pages/FullView/ScanView';
import RegisterCar from '../pages/FullView/RegisterCar';

export default {
    Home: { screen: Home },
    FullView: { screen: FullView },
    Events: { screen: Events },
    Setting: { screen: Setting },
    SiteDetail: { screen: SiteDetail },
    EventDetail: { screen: EventDetail },
    ScanView: { screen: ScanView },
    RegisterCar: { screen: RegisterCar },
    UpgradeVersionView: { screen: UpgradeVersionView },
    HistoryView: { screen: HistoryView },
    LanguageView: { screen: LanguageView },
}