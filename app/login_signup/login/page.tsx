"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import styled, { keyframes } from "styled-components";
import { FaEye, FaEyeSlash, FaUserAlt, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
      router.push("/");
    } catch (error) {
      alert("Login Unsuccessful. Kindly check the Email and Password.");
    }
  };

  return (
    <StyledWrapper>
      <motion.div
        className="outer-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating Particles */}
        <motion.div
          className="particle particle-1"
          initial={{ y: -100, x: -100 }}
          animate={{ y: [0, 100, 0], x: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="particle particle-2"
          initial={{ y: -200, x: 200 }}
          animate={{ y: [0, 150, 0], x: [0, -150, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="particle particle-3"
          initial={{ y: 100, x: -200 }}
          animate={{ y: [0, -150, 0], x: [0, 150, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="card"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="card2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <form className="form" onSubmit={handleLogin}>
              <motion.p
                id="heading"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Login
              </motion.p>

              <motion.div
                className="field"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <FaUserAlt className="icon" />
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                className="field"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <FaLock className="icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="toggle-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </motion.div>

              <motion.div
                className="btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  className="button1"
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Login
                </motion.button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <motion.button
                  className="button2"
                  type="button"
                  onClick={() => router.push("./signup")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Sign Up
                </motion.button>
              </motion.div>

              <motion.div
                className="forgot-password"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.button
                  className="forgot-btn"
                  type="button"
                  onClick={() => router.push("./forgotpassword")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Forgot Password?
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </StyledWrapper>
  );
}

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 255, 200, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 200, 0.8); }
  100% { box-shadow: 0 0 10px rgba(0, 255, 200, 0.5); }
`;

const StyledWrapper = styled.div`
  .outer-background {
    background: linear-gradient(135deg, #1a1a1a, #000000);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: hidden;
    position: relative;
  }

  .particle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(0, 255, 200, 0.5);
    border-radius: 50%;
    animation: ${float} 5s infinite ease-in-out;
  }

  .particle-1 { top: 10%; left: 20%; }
  .particle-2 { top: 30%; left: 70%; }
  .particle-3 { top: 70%; left: 40%; }

  .card {
    background: linear-gradient(135deg, #00ff75, #3700ff);
    border-radius: 22px;
    padding: 3px;
    animation: ${glow} 3s infinite ease-in-out;
  }

  .card2 {
    background: #171717;
    border-radius: 20px;
    padding: 2em;
    transition: all 0.3s ease-in-out;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
  }

  #heading {
    text-align: center;
    margin: 1em 0;
    color: rgb(0, 255, 200);
    font-size: 1.5em;
    font-weight: bold;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.8em;
    background-color: #1f1f1f;
    box-shadow: inset 2px 5px 10px rgba(5, 5, 5, 0.5);
    position: relative;
    transition: all 0.3s ease-in-out;
  }

  .icon {
    color: rgb(0, 255, 200);
    font-size: 1.2em;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: rgb(0, 255, 200);
    font-size: 1em;
    transition: all 0.3s ease-in-out;
  }

  .input-field:focus {
    transform: scale(1.05);
  }

  .toggle-visibility {
    position: absolute;
    right: 1em;
    cursor: pointer;
    color: rgb(0, 255, 200);
    transition: transform 0.3s;
  }

  .toggle-visibility:hover {
    transform: scale(1.2);
    color: #ff0000;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-top: 2em;
    gap: 1em;
  }

  .button1, .button2 {
    padding: 0.8em 1.5em;
    border-radius: 25px;
    border: none;
    transition: all 0.4s ease-in-out;
    background: linear-gradient(135deg, #00ff75, #3700ff);
    color: #000;
    font-weight: bold;
    cursor: pointer;
  }

  .button1:hover, .button2:hover {
    background: linear-gradient(135deg, #00642f, #13034b);
    color: rgb(0, 255, 200);
    transform: translateY(-2px);
  }

  .forgot-password {
    display: flex;
    justify-content: center;
    margin-top: 1.5em;
  }

  .forgot-btn {
    padding: 0.5em 1em;
    border-radius: 25px;
    background: linear-gradient(135deg, #00ff75, #3700ff);
    color: #000;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .forgot-btn:hover {
    background: linear-gradient(135deg, #ff0000, #ff6f00);
    color: #fff;
    transform: translateY(-2px);
  }
`;