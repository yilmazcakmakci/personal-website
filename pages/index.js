import Layout from '../components/Layout'
import Social from '../components/Social'
import Image from '../components/Image'
import { Flex, Heading, Box, Text, Center, Link } from '@chakra-ui/react'

export default function Home() {
    return (
        <Layout title="Anasayfa" description="Kişisel Web Sitesi">
            <Flex
                px={4}
                mt={[16, 20, 48]}
                direction={{ base: 'column-reverse', md: 'row' }}
            >
                <Box w={{ md: '60%' }}>
                    <Heading color="gray.200" as="h1">
                        Hi, I'm Yılmaz
                    </Heading>
                    <Text color="gray.300" mt={6}>
                        I am a passionate software developer from Istanbul.
                        I am dedicated to continuously growing as a developer
                        and building projects that bring value.
                    </Text>
                    <Text mt={2} color="gray.300">
                        Currently, I am working as a
                        <Text as="i"> Frontend Developer</Text> at
                        <Link
                            href="https://www.hybrone.com/"
                            _hover={{ color: 'cyan.600' }}
                            fontWeight="600"
                            isExternal
                        >
                            {' '}
                            Hybrone
                        </Link>
                        .
                    </Text>

                    <Box mt={6}>
                        <Text as="small" color="gray.600">
                            Follow Me
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
                        src="/me-last.png"
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
