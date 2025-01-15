import { HStack, IconButton, Link } from '@chakra-ui/react'
import { FaLinkedinIn, FaMediumM, FaGithub, FaTwitter } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'

const size = 16

const socialMediaLinks = [
    {
        name: 'github',
        icon: <FaGithub size={size} />,
        url: 'https://github.com/yilmazcakmakci',
    },
    {
        name: 'linkedin',
        icon: <FaLinkedinIn size={size} />,
        url: 'https://www.linkedin.com/in/yilmazcakmakci/',
    },
    {
        name: 'twitter',
        icon: <FaTwitter size={size} />,
        url: 'https://twitter.com/yilmazdev',
    },
    {
        name: 'mail',
        icon: <GrMail size={size} />,
        url: 'mailto:me@yilmazc.com',
    },
]

const Social = () => {
    return (
        <HStack spacing={4} mt={2}>
            {socialMediaLinks.map(({ name, url, icon }) => (
                <IconButton
                    key={name}
                    borderRadius="full"
                    _hover={{ color: 'cyan.600' }}
                    bg="gray.800"
                    title={name}
                    as={Link}
                    isExternal
                    href={url}
                >
                    {icon}
                </IconButton>
            ))}
        </HStack>
    )
}

export default Social
