import { useSelector } from "react-redux";
import Assistant from '../../src/Apps/Assistant';
import User from '../../src/Apps/User';
import LoginScreen from '../../src/FirstPage/LoginScreen';


export function MainScreen() {
    const user = useSelector(state => state.auth.user)
    return (!user ? <LoginScreen /> : user.profileName === "busManager" ? <Assistant /> : <User />)
}
