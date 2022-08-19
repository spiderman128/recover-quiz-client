/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
      setLoading(true);
      //To know my current status, send Auth request
      dispatch(auth())
      .then((response) => {
        //Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
          setLoading(false);
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
            setLoading(false);
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              props.history.push("/");
              setLoading(false);
            } else {
              setLoading(false);
            }
          }
        }
      }).catch((err) => {
        setLoading(false);
        if(option)
          props.history.push("/login");
      });
    }, []);

    return loading ? (
      <div style={{marginTop:400}} className="text-center">
        <span className="spinner-border" style={{width: 50, height: 50}}></span>
      </div>
    ) : (
      <SpecificComponent {...props} user={user} />
    );
  }
  return AuthenticationCheck;
}
