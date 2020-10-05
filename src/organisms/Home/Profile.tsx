import { Text, Stack, Tag } from '../../atoms'
import Widget from '../../molecules/widget/index'
import { MotionImage, MotionStack } from '../../atoms/index'
import { containerVariants, childVariants } from '../../../pages/index'

export function Profile() {
	return (
		<Stack spacing="1rem">
			<MotionImage
				initial="initial"
				animate="animate"
				variants={{
					initial: { opacity: 0, rotateX: -50, rotateY: 10 },
					animate: {
						opacity: 1,
						rotateX: 0,
						rotateY: 0,
						transition: { duration: 0.5, damping: 10 },
					},
				}}
				src="https://i.ibb.co/Q8FHs8N/photo-grid-20-09-2020-09-21-20-2.jpg"
				rounded="md"
				size="15rem"
			/>
			<Text>Hi there! 👋</Text>
			<Stack direction="row" alignItems="center">
				<Text fontSize="2rem">I'm Rishi Kothari.</Text>
				<Tag size="sm" variant="outline" height="1rem">
					he/him
				</Tag>
			</Stack>
			<Text>
				<b>TL;DR</b> I'm a 15 year old developer that really likes to make
				things using <em>awesome</em> technologies.
			</Text>

			<Text>
				I've been programming for about 7 years now (I started all the way back
				when I was 8), and I've been able to get my hands onto a lot of
				different technologies and work positions.
			</Text>

			<Text>
				While I'm not currently looking for internships, my next opening is in{' '}
				<b>Spring 2021</b>. If you have a cool idea, feel free to write me an
				email at [hey@rishi.cx].
			</Text>

			<MotionStack direction="row" spacing={3} variants={containerVariants}>
				<Widget
					variants={childVariants}
					link="https://github.com/rishiosaur"
					bgImage="https://images.unsplash.com/photo-1569305005583-5725b537a9ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
					title="gh"
					before="link"
					size="5rem"
				/>
				<Widget
					variants={childVariants}
					link="https://github.com/rishiosaur"
					bgImage="https://images.unsplash.com/photo-1576575230398-b64304828758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80"
					title="twtr"
					before="link"
					size="5rem"
				/>
				<Widget
					variants={childVariants}
					link="https://github.com/rishiosaur"
					bgImage="https://images.unsplash.com/photo-1509188216857-1e1df4686430?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80"
					title="ig"
					before="link"
					size="5rem"
				/>
			</MotionStack>

			<br />
		</Stack>
	)
}