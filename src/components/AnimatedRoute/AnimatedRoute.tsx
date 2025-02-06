import { motion } from 'framer-motion'
import { FC } from 'react'

const pageVariants = {
  initial: {
    opacity: 0,
    y: '10%',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '10%',
  },
}

const pageTransition = {}

type Props = {
  Route: FC
}

const AnimatedRoute: FC<Props> = ({ Route }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Route />
    </motion.div>
  )
}

export default AnimatedRoute
