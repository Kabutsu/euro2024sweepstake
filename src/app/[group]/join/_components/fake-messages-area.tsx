import MessageBubble from '../../chat/_components/message-bubble';

const posts = [
  {
    message: 'Hey fren!',
    isSender: true,
  },
  {
    message: 'What\'s up?',
    isSender: true,
  },
  {
    message: 'Not much, just chilling',
    isSender: false,
  },
  {
    message: 'Wanna hang out later?',
    isSender: true,
  },
  {
    message: 'Sure, where do you wanna meet?',
    isSender: false,
  },
  {
    message: 'How about the park?',
    isSender: true,
  },
  {
    message: 'We could take the dogs!!',
    isSender: true,
  },
  {
    message: 'Sounds good, see you there!',
    isSender: false,
  }
].map((post) => ({
  ...post,
  createdAt: new Date(),
  sender: {
    name: 'Hugo Walls',
    id: '1',
    image: null,
    email: null,
    emailVerified: null,
  },
}));

export default function Background() {
  return (
    <div className="absolute -top-20 sm:-top-16 right-0 left-0 bottom-0 flex flex-1 flex-col-reverse items-end p-8 pb-12 overflow-y-hidden bg-gradient-to-b from-[rgb(249,250,252)] to-[rgb(242,243,246)] ">
      {posts.map((post, index) => (
        <MessageBubble
          key={index}
          {...post}
        />
      ))}
    </div>
  )
}