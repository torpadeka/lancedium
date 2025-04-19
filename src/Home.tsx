'use client';

import lancediumLogo from './assets/lancedium-logo-transparent.png';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 flex justify-between items-center px-[5%] py-6 bg-white shadow-sm">
        <div className="flex items-center">
          <img
            src={lancediumLogo}
            alt="Lancedium Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold ml-2 text-slate-800">lancedium</h1>
        </div>
        <nav className="flex items-center">
          <ul className="hidden md:flex space-x-8 mr-8">
            <li>
              <a
                href="#features"
                className="text-slate-800 font-medium hover:text-indigo-500 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-slate-800 font-medium hover:text-indigo-500 transition-colors"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-slate-800 font-medium hover:text-indigo-500 transition-colors"
              >
                Testimonials
              </a>
            </li>
          </ul>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between px-[5%] py-20 bg-slate-50">
        <div className="max-w-xl z-10 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800 mb-6">
            Secure Freelancing with Blockchain Technology
          </h1>
          <p className="text-xl text-slate-500 mb-8">
            This page is too corpo-vibed. I need a coziers, more modern looking page ngl.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              asChild
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="rounded-xl"
            >
              <Link to="/auth?signup=true">
                Get Started
                <span
                  className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                >
                  →
                </span>
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild className="rounded-xl">
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
        </div>
        <div className="relative w-full md:w-2/5 flex justify-center">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-0 bg-indigo-100 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] z-0"></div>
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Freelancer working"
              className="relative z-10 w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </section>

      <section id="features" className="px-[5%] py-20 text-center">
        <h2 className="text-4xl font-bold mb-12 text-slate-800">
          Why Choose Lancedium?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Secure Payments
              </h3>
              <p className="text-slate-500">
                Smart contracts ensure your payments are secure and only
                released when work is completed.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Transparent Process
              </h3>
              <p className="text-slate-500">
                All transactions are recorded on the blockchain, providing
                complete transparency.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Lower Fees
              </h3>
              <p className="text-slate-500">
                Cut out the middleman and enjoy lower platform fees compared to
                traditional freelancing sites.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Global Talent
              </h3>
              <p className="text-slate-500">
                Access a worldwide pool of skilled freelancers without currency
                conversion headaches.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="how-it-works"
        className="px-[5%] py-20 bg-slate-50 text-center"
      >
        <h2 className="text-4xl font-bold mb-12 text-slate-800">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          <Card className="flex-1 min-w-[250px] max-w-[280px]">
            <CardContent className="p-8">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Create Your Profile
              </h3>
              <p className="text-slate-500">
                Sign up and create your profile as a client or freelancer.
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[250px] max-w-[280px]">
            <CardContent className="p-8">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Post or Find Jobs
              </h3>
              <p className="text-slate-500">
                Post a job or browse available opportunities that match your
                skills.
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[250px] max-w-[280px]">
            <CardContent className="p-8">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Secure Agreement
              </h3>
              <p className="text-slate-500">
                Create a smart contract that defines the scope, timeline, and
                payment terms.
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[250px] max-w-[280px]">
            <CardContent className="p-8">
              <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                Work & Get Paid
              </h3>
              <p className="text-slate-500">
                Complete the work and receive payment automatically when
                conditions are met.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="testimonials" className="px-[5%] py-20 text-center">
        <h2 className="text-4xl font-bold mb-12 text-slate-800">
          What Our Users Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          <Card className="flex-1 min-w-[300px] max-w-[500px]">
            <CardContent className="p-8">
              <p className="text-lg text-slate-800 mb-6 italic">
                "Lancedium has transformed how I find clients. The secure
                payment system gives me peace of mind."
              </p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-gray-300">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">
                    Alex Johnson
                  </h4>
                  <p className="text-slate-500">Freelance Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[300px] max-w-[500px]">
            <CardContent className="p-8">
              <p className="text-lg text-slate-800 mb-6 italic">
                "As a client, I love the transparency. I can track progress and
                know my funds are secure until work is delivered."
              </p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-gray-300">SW</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">
                    Sarah Williams
                  </h4>
                  <p className="text-slate-500">Startup Founder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-[5%] py-20 bg-indigo-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Freelancing Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of freelancers and clients already using Lancedium.
          </p>
          <Button size="lg" variant="secondary" asChild className="rounded-xl">
            <Link to="/auth?signup=true">Join Lancedium Today</Link>
          </Button>
        </div>
      </section>

      <footer className="px-[5%] py-16 bg-slate-50 border-t border-slate-200">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          <div className="lg:max-w-xs">
            <div className="flex items-center mb-6">
              <img
                src={lancediumLogo}
                alt="Lancedium Logo"
                className="h-8 w-auto"
              />
              <h3 className="text-xl font-bold ml-2 text-slate-800">
                lancedium
              </h3>
            </div>
            <p className="text-slate-500 mb-6">
              Secure, transparent freelancing powered by blockchain technology.
              Connect with global talent and clients.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-6 text-slate-800">
                Platform
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-slate-800">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-slate-800">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-indigo-500 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Lancedium. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-500 hover:text-indigo-500 transition-colors text-sm"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-indigo-500 transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-indigo-500 transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
