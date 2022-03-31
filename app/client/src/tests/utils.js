import { Provider } from 'react-redux'
import store from "../redux/store"

const ReduxProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
)

export {
    ReduxProvider
}