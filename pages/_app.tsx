import { request, gql } from 'graphql-request'
import {
	Box,
	ColorModeProvider,
	CSSReset,
	DarkMode,
	Flex,
	ITheme,
	ThemeProvider,
} from '@chakra-ui/core'
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	Variants,
} from 'framer-motion'
import { useEffect } from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import theme from '../src/theme'
import { MotionFlex } from '../src/atoms/index'
import { pageVariants } from '../src/molecules/motion/index'

const config = (theme: ITheme) => ({
	light: {
		color: theme.colors.white,
		bg: theme.colors.black,
		borderColor: theme.colors.white,
		placeholderColor: theme.colors.whiteAlpha[400],
	},
	dark: {
		color: theme.colors.white,
		bg: theme.colors.black,
		borderColor: theme.colors.white,
		placeholderColor: theme.colors.whiteAlpha[400],
	},
})

const WApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	const cursorX = useMotionValue(-100)
	const cursorY = useMotionValue(-100)

	const springConfig = { stiffness: 30, duration: 0 }
	const cursorXSpring = useSpring(cursorX, springConfig)
	const cursorYSpring = useSpring(cursorY, springConfig)

	useEffect(() => {
		const moveCursor = (e) => {
			cursorX.set(e.clientX - 16)
			cursorY.set(e.clientY - 16)
		}

		window.addEventListener('mousemove', moveCursor)

		return () => {
			window.removeEventListener('mousemove', moveCursor)
		}
	}, [cursorX, cursorY])

	return (
		<>
			<AnimatePresence exitBeforeEnter>
				<ThemeProvider theme={theme}>
					<ColorModeProvider>
						<CSSReset config={config} />
						<DarkMode>
							<MotionFlex
								key={router.route}
								initial="initial"
								animate="in"
								exit="out"
								variants={pageVariants}
								flexDir="column"
								height="100vh"
								marginX="auto">
								<Component {...pageProps} />
							</MotionFlex>
						</DarkMode>
					</ColorModeProvider>
				</ThemeProvider>
			</AnimatePresence>
			<motion.div
				className="cursor"
				style={{
					translateX: cursorXSpring,
					translateY: cursorYSpring,
				}}
			/>
			<style global jsx>
				{`
					html,
					body {
						height: 100%;
					}
					.cursor {
						position: fixed;
						left: 0;
						top: 0;
						width: 10px;
						height: 10px;
						border: 2px solid white;
						border-radius: 100rem;
						mix-blend-mode: difference;
						z-index: 999;
						pointer-events: none;
						transition: width 0.1s ease-in-out, height 0.1s ease-in-out;
					}
					* {
						cursor: none;
					}

					html {
						height: 100%;
					}
					body {
						min-height: 100%;
					}
				`}
			</style>
		</>
	)
}

export default WApp
