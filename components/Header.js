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
} from '@chakra-ui/react'
import { RiArrowDownSLine, RiHome5Line, RiArticleLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const menu = [
    { name: 'Home', url: '/', icon: RiHome5Line },
    { name: 'Articles', url: '/articles', icon: RiArticleLine },
]

const MotionFlex = motion(Flex)

export default function Header() {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(true)

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
            bg="#0D0F16"
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
                        _hover={{ color: 'cyan.600' }}
                        fontSize={14}
                        fontFamily="mono"
                    >
                        YILMAZ ÇAKMAKÇI
                    </Link>
                </NextLink>

                <Menu>
                    <MenuButton
                        as={Button}
                        fontSize={14}
                        rightIcon={<RiArrowDownSLine />}
                        leftIcon={<Icon as={currentPage()?.icon} />}
                    >
                        {currentPage()?.name}
                    </MenuButton>
                    <MenuList>
                        {menu.map(({ name, url, icon }) => {
                            return (
                                <MenuItem fontSize={14} key={url} p={0}>
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
                                            <Icon as={icon} />
                                            {name}
                                        </Link>
                                    </NextLink>
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </MotionFlex>
        </Box>
    )
}
