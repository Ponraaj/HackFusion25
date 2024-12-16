
// 'use client'
// import { motion } from "framer-motion"
// import CountDown from "./CountDown"

// export default function Hero() {
//   return (
//     <section id="home" className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-blue-600 to-purple-700 text-white">
//       {/* Cloud Layer */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
//         <motion.svg 
//           xmlns="http://www.w3.org/2000/svg" 
//           viewBox="0 0 1440 320" 
//           className="absolute top-0 left-0 w-full opacity-40"
//           initial={{ x: -200 }}
//           animate={{ 
//             x: [0, 200, -200],
//             transition: {
//               duration: 30,
//               repeat: Infinity,
//               ease: "linear"
//             }
//           }}
//         >
//           {/* First Cloud Layer */}
//           <path 
//             d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
//             fill="rgba(255,255,255,0.3)"
//           ></path>
          
//           {/* Second Cloud Layer */}
//           <path 
//             d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,106.7C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
//             fill="rgba(255,255,255,0.2)"
//           ></path>
//         </motion.svg>

//         {/* Additional Cloud Layer */}
//         <motion.svg 
//           xmlns="http://www.w3.org/2000/svg" 
//           viewBox="0 0 1440 320" 
//           className="absolute top-0 left-0 w-full opacity-30"
//           initial={{ x: 200 }}
//           animate={{ 
//             x: [200, -200, 200],
//             transition: {
//               duration: 45,
//               repeat: Infinity,
//               ease: "linear"
//             }
//           }}
//         >
//           <path 
//             d="M0,224L48,240C96,256,192,288,288,293.3C384,299,480,277,576,261.3C672,245,768,235,864,234.7C960,235,1056,245,1152,256C1248,267,1344,277,1392,282.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
//             fill="rgba(255,255,255,0.2)"
//           ></path>
//         </motion.svg>
//       </div>

//       {/* Existing Hero Content */}
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-6xl font-bold relative z-10"
//       >
//         Welcome to HackFusion 2025!
//       </motion.h1>
      
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5, delay: 0.5 }}
//         className="mt-4 text-xl relative z-10"
//       >
//         Innovate. Create. Collaborate.
//       </motion.p>
      
//       <div className="relative z-10">
//         <CountDown targetDate={"2025-01-01T10:00:00"} />
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md relative z-10"
//       >
//         Register Now
//       </motion.button>
//     </section>
//   )
// }
'use client'
import { motion, AnimatePresence } from "framer-motion"
import CountDown from "./CountDown"
import { useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true);

  const smokeVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'blur(10px)'
    },
    animate: {
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      filter: 'blur(20px)',
      transition: {
        duration: 1.5,
        ease: "easeIn"
      }
    }
  };

  const smokePaths = [
    "M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,106.7C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    "M0,224L48,240C96,256,192,288,288,293.3C384,299,480,277,576,261.3C672,245,768,235,864,234.7C960,235,1056,245,1152,256C1248,267,1344,277,1392,282.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
  ];

  return (
    <section 
      id="home" 
      className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-blue-600 to-purple-700 text-white"
    >
      {/* Smoke Layer */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
            variants={smokeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {smokePaths.map((path, index) => (
              <motion.svg 
                key={index}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320" 
                className="absolute top-0 left-0 w-full"
                style={{ 
                  opacity: 0.4 - (index * 0.1),
                  zIndex: 1 
                }}
                initial={{ x: index % 2 === 0 ? -200 : 200 }}
                animate={{ 
                  x: [0, index % 2 === 0 ? 200 : -200, index % 2 === 0 ? -200 : 200],
                  transition: {
                    duration: 30 + (index * 15),
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <path 
                  d={path} 
                  fill={`rgba(255,255,255,${0.3 - (index * 0.1)})`}
                />
              </motion.svg>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold relative z-10"
      >
        Welcome to HackFusion 2025!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mt-4 text-xl relative z-10"
      >
        Innovate. Create. Collaborate.
      </motion.p>
      
      <div className="relative z-10">
        <CountDown targetDate={"2025-01-01T10:00:00"} />
      </div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md relative z-10"
        onClick={() => setIsVisible(false)}
      >
        Register Now
      </motion.button>
      
    </section>
  )
}