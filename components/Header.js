import {
    Flex,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Icon,
    IconButton,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react'
import { RiArrowDownSLine, RiHome5Line, RiArticleLine, RiSunLine, RiMoonLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const menu = [
    { name: 'Home', url: '/', icon: RiHome5Line },
    { name: 'Articles', url: '/articles', icon: RiArticleLine },
]

const MotionFlex = motion(Flex)
const MotionIconButton = motion(IconButton)

export default function Header() {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(true)
    const { colorMode, toggleColorMode } = useColorMode()

    const bg = useColorModeValue('gray.100', '#0D0F16')
    const logoColor = useColorModeValue('gray.800', 'gray.200')
    const logoHoverColor = useColorModeValue('blue.600', 'blue.400')
    const iconHoverColor = useColorModeValue('blue.600', 'blue.400')
    const menuButtonBg = useColorModeValue('gray.200', 'gray.800')
    const menuButtonHoverBg = useColorModeValue('gray.300', 'gray.700')
    const menuListBg = useColorModeValue('gray.100', '#0D0F16')
    const menuItemHoverBg = useColorModeValue('gray.200', 'gray.800')

    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const direction = currentScrollY > lastScrollY ? "down" : "up"
            
            if (direction === "down" && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const currentPage = () => {
        if (router.pathname === '/') return menu[0]

        return menu.find(
            ({ url }) => router.pathname.includes(url) && url !== '/'
        )
    }

    return (
        <Box
            position="sticky"
            top={0}
            zIndex={1000}
            bg={bg}
            width="100%"
            transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
            transition="transform 0.3s"
        >
            <MotionFlex
                as="nav"
                py={[5, 5, 6]}
                px={4}
                justify="space-between"
                align="center"
            >
                <NextLink href="/" passHref>
                    <Link
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ color: logoHoverColor }}
                        fontSize={14}
                        fontFamily="mono"
                        color={logoColor}
                    >
                        YILMAZ ÇAKMAKÇI
                    </Link>
                </NextLink>

                {/* <Flex gap={4} align="center">
                    <Box position="relative" w="40px" h="40px">
                        <AnimatePresence mode="wait" initial={false}>
                            <MotionIconButton
                                key={colorMode}
                                aria-label="Toggle dark mode"
                                icon={colorMode === 'dark' ? <RiSunLine /> : <RiMoonLine />}
                                variant="ghost"
                                onClick={toggleColorMode}
                                position="absolute"
                                w="40px"
                                h="40px"
                                _focus={{ boxShadow: 'none' }}
                                _hover={{ color: iconHoverColor }}
                                _active={{ bg: 'transparent' }}
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>
                    </Box>
                    <Menu>
                        <Box w={{ base: "40px", md: "120px" }}>
                            <MenuButton
                                as={Button}
                                fontSize={14}
                                w="full"
                                h="40px"
                                p={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg={menuButtonBg}
                                _hover={{ bg: menuButtonHoverBg }}
                                _active={{ bg: menuButtonHoverBg }}
                            >
                                <Flex
                                    w="full"
                                    px={{ md: 3 }}
                                    align="center"
                                    justify={{ base: "center", md: "space-between" }}
                                >
                                    <Icon as={currentPage()?.icon} boxSize={4} />
                                    <Text display={{ base: "none", md: "block" }} mx={2} flex={1} textAlign="center">
                                        {currentPage()?.name}
                                    </Text>
                                    <Icon as={RiArrowDownSLine} display={{ base: "none", md: "block" }} boxSize={4} />
                                </Flex>
                            </MenuButton>
                        </Box>
                        <MenuList bg={menuListBg}>
                            {menu.map(({ name, url, icon }) => {
                                return (
                                    <MenuItem
                                        fontSize={14}
                                        key={url}
                                        p={0}
                                        _hover={{ bg: menuItemHoverBg }}
                                        bg={menuListBg}
                                    >
                                        <NextLink href={url} passHref>
                                            <Link
                                                px={3}
                                                py={2}
                                                w="full"
                                                display="flex"
                                                alignItems="center"
                                                gap={2}
                                                _hover={{ textDecoration: 'none' }}
                                            >
                                                <Icon as={icon} boxSize={4} />
                                                {name}
                                            </Link>
                                        </NextLink>
                                    </MenuItem>
                                )
                            })}
                        </MenuList>
                    </Menu>
                </Flex> */}
            </MotionFlex>
        </Box>
    )
}
