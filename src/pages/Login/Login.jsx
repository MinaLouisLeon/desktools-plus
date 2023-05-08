import React, { useEffect } from "react";
import "./Login.css";
import { Button, Form, Input } from "antd";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { actionUserLoggedIn } from "../../redux/loggedInUserReducer";
import { useHistory } from "react-router";
import { IonPage } from "@ionic/react";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.AppsReducer.mode);
  const isLoggedIn = useSelector(
    (state) => state.loggedInUserReducer.isLoggedIn
  );
  const handleFinish = (values) => {
    signInWithEmailAndPassword(
      auth,
      `${values.Username}@desktools.plus`,
      `${values.Password}`
    ).then((userCredential) => {
      const user = userCredential.user;
      dispatch(
        actionUserLoggedIn({
          uid: user.uid,
          email: user.email,
        })
      );
      if (mode === "mobile") {
        history.push("/mobile");
      } else if (mode === "desktop") {
        history.push("/Home");
      }
    });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      try {
        if (user) {
          dispatch(actionUserLoggedIn({ uid: user.uid, email: user.email }));
          if (mode === "mobile") {
            history.push("/mobile");
          } else if (mode === "desktop") {
            history.push("/Home");
          }
        } else {
          // console.log("no user");
        }
      } catch (err) {
        // console.log(err);
      }
    });
    //eslint-disable-next-line
  }, []);
  return (
    <IonPage>
      {!isLoggedIn && (
        <div className="loginContainer">
          <div className="shadow-2 br2 pa4">
            <Form className="br2" layout="vertical" onFinish={handleFinish}>
              <Form.Item
                label="Username"
                name="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                tooltip="This is a required field"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "please input your password!",
                  },
                ]}
                tooltip="This is a required field"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="password">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </IonPage>
  );
};

export default Login;
