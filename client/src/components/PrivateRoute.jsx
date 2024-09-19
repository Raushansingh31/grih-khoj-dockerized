import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'; //Outlet: This component renders the child route elements when the route is matched.
//Navigate: This component is used to redirect the user to a different route. same as usenavigate

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
