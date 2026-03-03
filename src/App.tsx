import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "./components/Landing";
import { SignInPage } from "./components/SignInPage";
import { SignUpPage } from "./components/SignUpPage";
import { AppLayout } from "./app/AppLayout";
import "./App.css";

function App() {
    return (
        <>
            <AuthLoading>
                <div className="flex h-screen w-full items-center justify-center">
                    <div className="spinner"></div>
                </div>
            </AuthLoading>

            <Unauthenticated>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Unauthenticated>

            <Authenticated>
                <Routes>
                    <Route path="/*" element={<AppLayout />} />
                </Routes>
            </Authenticated>
        </>
    );
}

export default App;
