import { Flex, Link, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const menu = [
    { name: 'Home', url: '/' },
    { name: 'About Me', url: '/about' },
    { name: 'Articles', url: '/articles' },
    { name: 'Projects', url: '/projects' },
]

export default function Home() {

    const router = useRouter()
    const currentPage = menu.find(({ url }) => url === router.pathname)

    return (
        <Flex as="nav" py={[5, 5, 10]} justify="space-between" align="center">
            <NextLink href="/" passHref>
                <Link
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ color: 'teal.400' }}
                    fontSize={14}
                    fontFamily="mono"
                    pl={4}>
                    YILMAZ ÇAKMAKÇI
                </Link>
            </NextLink>

            <Menu>
                <MenuButton as={Button} fontSize={14} rightIcon={<RiArrowDownSLine />}>{currentPage?.name}</MenuButton>
                <MenuList>
                    {
                        menu.map(({ name, url }) => {
                            return (
                                <MenuItem fontSize={14} key={url} p={0}>
                                    <NextLink href={url} passHref>
                                        <Link px={3} py={2} w="full" _hover={{ textDecoration: 'none' }}>{name}</Link>
                                    </NextLink>
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
        </Flex>
    )
}