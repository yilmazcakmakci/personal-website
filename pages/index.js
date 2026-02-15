import Layout from '../components/Layout'
import Social from '../components/Social'
import Image from '../components/Image'
import { Flex, Heading, Box, Text, Center, Link, useColorModeValue } from '@chakra-ui/react'

export default function Home() {
    const headingColor = useColorModeValue('gray.800', 'gray.200')
    const textColor = useColorModeValue('gray.700', 'gray.300')
    const smallTextColor = useColorModeValue('gray.500', 'gray.600')

    return (
        <Layout title="Anasayfa" description="Kişisel Web Sitesi">
            <Flex
                px={4}
                mt={[16, 20, 48]}
                direction={{ base: 'column-reverse', md: 'row' }}
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
        </Layout>
    )
}
