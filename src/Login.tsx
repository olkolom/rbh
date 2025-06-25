import { useAuth } from './AuthContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const clientId = import.meta.env.DEV ? 
    '383098064574-l95dgqcif425vr183k3k6ttaj43980vi.apps.googleusercontent.com' :
    '383098064574-ar94l6lnc0np2uvana0csur6aunfucer.apps.googleusercontent.com'

const Login = () => {
  
  const auth = useAuth()
  
  return (
    <div className='flex flex-col items-center p-2 gap-2'>
        <p className='font-serif font-bold text-4xl'>Back Office</p>
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin 
                onSuccess={credentialResponse => {
                    if (credentialResponse?.credential) {
                        auth.login(credentialResponse?.credential)
                    } else { console.log('Login Failed') }
                }}
                onError={() => {
                    console.log('Login Failed')
                }}
                theme='filled_black'
                useOneTap
                auto_select/>        
        </GoogleOAuthProvider>
    </div>
  );
};

export default Login