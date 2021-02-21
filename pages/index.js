import Layout from '../components/Layout'
import Social from '../components/Social'
import Image from '../components/Image'
import { Flex, Heading, Box, Text, Center, Link } from '@chakra-ui/react'

export default function Home() {
    return (
        <Layout>
            <Flex px={4} mt={[16, 20, 48]} direction={{ base: 'column-reverse', md: 'row' }}>
                <Box w={{ md: '60%' }}>
                    <Heading color="gray.200" as="h1">Hi, I'm Yılmaz</Heading>
                    <Text color="gray.400" mt={6}>
                        I am a passionate software developer from Istanbul.
                        I love learning new things and try them on a project.
                        I always try to keep myself up to date and share what I learned.
                    </Text>
                    <Text mt={2} color="gray.400">
                        Currently, I am working as a
                        <Text as="i"> frontend developer</Text> at
                        <Link href="https://www.biges.com/tr/" _hover={{ color: 'teal.400' }} fontWeight="600" isExternal> Biges</Link>.
                    </Text>


                    <Box mt={6}>
                        <Text as="small" color="gray.600">Follow Me</Text>
                        <Social />
                    </Box>
                </Box>

                <Center w={{ md: '40%' }} justifyContent={{ sm: 'flex-start', md: 'flex-end' }} mb={[6, 6, 0]}>
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
