import Layout from '../components/Layout'
import Social from '../components/Social'
import Image from '../components/Image'
import WorkExperience from '../components/WorkExperience'
import { experiences } from '../data/experience'
import { Flex, Heading, Box, Text, Center, Link, Icon, useColorModeValue } from '@chakra-ui/react'
import { RiArrowDownLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
    const headingColor = useColorModeValue('gray.800', 'gray.200')
    const textColor = useColorModeValue('gray.700', 'gray.300')
    const smallTextColor = useColorModeValue('gray.500', 'gray.600')
    const scrollIconColor = useColorModeValue('gray.500', 'gray.500')
    const scrollPillBg = useColorModeValue('white', 'gray.800')
    const scrollPillBorder = useColorModeValue('gray.200', 'gray.700')
    const scrollPillHoverBorder = useColorModeValue('blue.300', 'blue.600')
    const [showScrollIcon, setShowScrollIcon] = useState(true)

    useEffect(() => {
        const el = document.getElementById('experience')
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowScrollIcon(!entry.isIntersecting)
            },
            { threshold: 0.1, rootMargin: '0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <Layout title="Anasayfa" description="Kişisel Web Sitesi">
            <Box as="main">
                {/* Hero: content at top, scroll icon just below */}
                <Flex
                    as="section"
                    minH="calc(100vh - 80px)"
                    direction="column"
                    px={4}
                >
                    <Flex
                        mt={[12, 14, 20]}
                        direction={{ base: 'column-reverse', md: 'row' }}
                        align={{ base: 'flex-start', md: 'center' }}
                    >
                        <Box w={{ md: '60%' }}>
                            <Heading color={headingColor} as="h1">
                                Hi, I'm Yılmaz
                            </Heading>
                            <Text color={textColor} mt={6}>
                                Senior frontend engineer building scalable systems and high-performance products.
                            </Text>
                            <Text color={textColor} mt={2}>
                                I design component architectures, real-time interfaces and frontend infrastructure that help teams move faster.
                            </Text>
                            <Text mt={6} color={textColor}>
                                Currently, I am working as a
                                <Text as="i"> Senior Frontend Developer</Text> at
                                <Link
                                    href="https://www.hybrone.com/"
                                    _hover={{ color: 'blue.600' }}
                                    fontWeight="600"
                                    isExternal
                                >
                                    {' '}
                                    Hybrone
                                </Link>
                                .
                            </Text>

                            <Box mt={6}>
                                <Text as="small" color={smallTextColor}>
                                    Get in Touch
                                </Text>
                                <Social />
                            </Box>
                        </Box>

                        <Center
                            w={{ md: '40%' }}
                            justifyContent={{ sm: 'flex-start', md: 'flex-end' }}
                            mb={[6, 6, 0]}
                        >
                            <Image
                                src="/me.png"
                                alt="Picture of the author"
                                width={200}
                                height={200}
                                borderRadius="full"
                            />
                        </Center>
                    </Flex>

                    {/* Scroll to Experience – pill + arrow, hidden when section in view */}
                    <AnimatePresence>
                        {showScrollIcon && (
                            <Flex
                                key="scroll-indicator"
                                as={motion.div}
                                justify="center"
                                pt={10}
                                pb={6}
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Box
                                    as={motion.div}
                                    role="group"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    gap={3}
                                    cursor="pointer"
                                    onClick={scrollToExperience}
                                    aria-label="Scroll to experience section"
                                >
                                    <Box
                                        px={4}
                                        py={2}
                                        borderRadius="full"
                                        bg={scrollPillBg}
                                        borderWidth="1px"
                                        borderColor={scrollPillBorder}
                                        boxShadow="sm"
                                        _groupHover={{
                                            borderColor: scrollPillHoverBorder,
                                            boxShadow: 'md',
                                        }}
                                        transition="all 0.2s ease"
                                    >
                                        <Text
                                            fontSize="xs"
                                            fontWeight="500"
                                            letterSpacing="wider"
                                            color={scrollIconColor}
                                            _groupHover={{ color: 'blue.500' }}
                                            transition="color 0.2s"
                                        >
                                            Experience
                                        </Text>
                                    </Box>
                                    <motion.div
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{
                                            duration: 1.8,
                                            repeat: Infinity,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                    >
                                        <Icon
                                            as={RiArrowDownLine}
                                            boxSize={5}
                                            color={scrollIconColor}
                                            _groupHover={{ color: 'blue.500' }}
                                            transition="color 0.2s"
                                        />
                                    </motion.div>
                                </Box>
                            </Flex>
                        )}
                    </AnimatePresence>
                </Flex>

                <WorkExperience experiences={experiences} sectionTitle="Work Experience" />
            </Box>
        </Layout>
    )
}
