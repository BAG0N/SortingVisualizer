import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const About: FC<Props> = (props) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-stone-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          About Sorting Visualizer
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            What is Sorting Visualizer?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Sorting Visualizer is an interactive web application that helps you
            understand how sorting algorithms work by visualizing their
            step-by-step execution. Includes player functionality so you can
            pause, rewind, and adjust the speed of the algorithm's execution for
            in-depth analysis
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-stone-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-100">Frontend</h3>
              <ul className="mt-2 text-gray-300">
                <li>Vite + React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>shadcn/ui</li>
              </ul>
            </div>
            <div className="bg-stone-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-100">Other</h3>
              <ul className="mt-2 text-gray-300">
                <li>Vercel</li>
                <li>Module CSS</li>
                <li>Lucide React</li>
                <li>Axios</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Ready to Explore?
          </h2>
          <p className="text-gray-300 mb-6">
            Dive into the world of sorting algorithms and see how they work in
            real-time!
          </p>
          <Link
            to="/"
            className="inline-block bg-lime-700 text-white px-6 py-3 rounded-lg hover:bg-lime-800 transition duration-300"
          >
            Start Sorting
          </Link>
        </section>
      </div>
    </div>
  )
}

export default About
