import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    return (
        <div className="flex flex-col gap-6 p-4 border-2 border-black items-center">
            <div className="text-xl font-bold">Register</div>
            <div className="flex flex-col items-center gap-6 w-full max-w-md p-4">
                <div className="relative w-50 h-10 max-w-xs p-5 bg-gray-300 rounded-lg text-center ml-right">
                    <p>The world without mom and dad is rough!</p>
                </div>
                <div className="relative w-50 h-10 max-w-xs p-5 bg-gray-300 rounded-lg text-center ml-auto">
                    <p>Will my puppy do well?</p>
                </div>
                <div className="relative w-50 h-10 max-w-xs p-5 bg-gray-300 rounded-lg text-center ml-right">
                    <p>Leave all your worries to Howduai!</p>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold">How Do I?</h2>
                    <h1 className="text-lg">
                        Welcome to Howuai!
                        <br />
                        Which member would you like to join?
                    </h1>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col items-right">
                    <h1 className="text-sm mb-2">I want to help!</h1>
                    <button className="text-white px-4 py-2 transition duration-300 ease-in-out w-full max-w-xs bg-blue-500 rounded-full hover:bg-darkblue">
                        Member member
                    </button>
                </div>
                <div className="flex flex-col items-left">
                    <h1 className="text-sm mb-2">I need help!</h1>
                    <button className="text-white px-4 py-2 transition duration-300 ease-in-out w-full max-w-xs bg-gray-500 rounded-full hover:bg-darkgray">
                        Dog member
                    </button>
                </div>
            </div>

            <Link to="/MobileAuth">
                <button className="text-white px-4 py-2 mt-4 transition duration-300 ease-in-out w-full max-w-xs bg-blue-500 rounded-full hover:bg-darkblue">
                    Next
                </button>
            </Link>

            <footer className="bg-gray-500 px-4 py-6 text-white flex justify-between w-full">
                <a href="/" className="text-white text-sm no-underline hover:text-decoration-underline">
                    Home
                </a>
                <a href="/PostQuestion" className="text-white text-sm no-underline hover:text-decoration-underline">
                    Upload post
                </a>
                <a href="/ScrapList" className="text-white text-sm no-underline hover:text-decoration-underline">
                    Scrap
                </a>
                <a href="/MyPage" className="text-white text-sm no-underline hover:text-decoration-underline">
                    My Page
                </a>
            </footer>
        </div>
    );
}
