import React from "react";
import { MailOutlined, GithubFilled, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-14">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Inception</h2>
          <p className="text-sm">Efficiently manage and track your projects</p>
        </div>
        
        <div className="flex items-center">
          <a href="mailto:your-email@example.com" className="text-white mr-4 hover:text-gray-300">
            <MailOutlined style={{ fontSize: "24px" }} />
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-white mr-4 hover:text-gray-300">
            <GithubFilled style={{ fontSize: "24px" }} />
          </a>
          <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer" className="text-white mr-4 hover:text-gray-300">
            <TwitterOutlined style={{ fontSize: "24px" }} />
          </a>
          <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <InstagramOutlined style={{ fontSize: "24px" }} />
          </a>
        </div>
        <div className="mt-4 md:mt-0">
          <form action="/subscribe" method="post" className="flex">
            <input type="email" name="email" placeholder="Enter your email" className="bg-gray-200 px-4 py-2 rounded-l-md focus:outline-none" required />
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 focus:outline-none">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;