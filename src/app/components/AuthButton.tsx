import { Button, HStack, Text, Avatar, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const UserProfile = () => {
    const { data: session } = useSession();

    const handleSignOut = () => {
        localStorage.removeItem('todos');
        signOut()
    }

    return (
        <HStack spacing={4} align="center">
            {session ? (
                <>
                    <Flex alignItems='center'>
                        <Avatar name={session.user?.name || 'User'} src={session.user?.image || ''} />
                        <Text fontWeight="bold" marginInlineStart='5px'>{session.user?.name}</Text>
                    </Flex>
                    <Button
                        size="sm"
                        leftIcon={<FiLogOut />}
                        onClick={() => handleSignOut()}
                    >
                        Sign out
                    </Button>
                </>
            ) : (
                <Button
                    size="sm"
                    leftIcon={<FiLogIn />}
                    onClick={() => signIn()}
                >
                    Sign in
                </Button>
            )}
        </HStack>
    );
};

export default UserProfile;
