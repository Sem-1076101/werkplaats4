import { useNavigation as useNativeNavigation } from '@react-navigation/native';
import { useNavigate } from 'react-router-dom';
import isWeb from '../isWeb';

function useNavigation() {
    if (isWeb) {
        const navigate = useNavigate();
        return {
            navigate,
        };
    } else {
        return useNativeNavigation();
    }
}

export default useNavigation;
