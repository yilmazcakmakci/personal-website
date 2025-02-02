import { IconButton } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowUp } from 'react-icons/io'
import { useState, useEffect } from 'react'

const MotionIconButton = motion(IconButton)

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionIconButton
                    onClick={scrollToTop}
                    position="fixed"
                    bottom="4"
                    right={{ 
                        base: "4",
                        sm: "4",
                        md: "4",
                        lg: "calc((100vw - 768px) / 2 - 60px)",
                        xl: "calc((100vw - 768px) / 2 - 60px)"
                    }}
                    zIndex={999}
                    aria-label="Scroll to top"
                    icon={<IoIosArrowUp size={24} />}
                    size="lg"
                    colorScheme="cyan"
                    bg="gray.800"
                    color="cyan.400"
                    opacity="0.6"
                    _hover={{
                        bg: "gray.700",
                        transform: "translateY(-2px)",
                        opacity: "1"
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.6 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </AnimatePresence>
    )
} 