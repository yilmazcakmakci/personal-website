import { IconButton } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowUp } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { RiArrowUpLine } from 'react-icons/ri'

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
                    icon={<RiArrowUpLine />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    color="blue.400"
                    opacity={isVisible ? 1 : 0}
                    transform={isVisible ? 'translateY(0)' : 'translateY(10px)'}
                    transition="all 0.3s"
                    _hover={{
                        bg: 'transparent',
                        color: 'blue.500',
                    }}
                    _active={{
                        bg: 'transparent',
                    }}
                />
            )}
        </AnimatePresence>
    )
} 