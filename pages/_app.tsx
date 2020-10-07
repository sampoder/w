/* eslint-disable no-bitwise */
import { request, gql } from 'graphql-request'
import {
	Box,
	ColorModeProvider,
	CSSReset,
	DarkMode,
	Flex,
	ITheme,
	ThemeProvider,
	theme as ChakraTheme,
} from '@chakra-ui/core'
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	Variants,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import App from 'next/app'

import { MotionFlex } from '../src/atoms/index'
import { pageVariants } from '../src/molecules/motion/index'

import { getStaticPaths } from './articles/[id]'
import { getTheme } from '../src/functions/fetch'

function toColor(num: number) {
	// eslint-disable-next-line no-param-reassign
	num >>>= 0
	const b = num & 0xff
	const g = (num & 0xff00) >>> 8
	const r = (num & 0xff0000) >>> 16
	const a = ((num & 0xff000000) >>> 24) / 255
	return `rgba(${[r, g, b, a].join(',')})`
}

const config = (theme: ITheme) => {
	console.log(theme.colors.black)
	console.log(theme.colors.white)

	console.log(theme)

	return {
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
	}
}

function WApp({ Component, pageProps, router, props }) {
	const cursorX = useMotionValue(-100)
	const cursorY = useMotionValue(-100)

	console.log(props)

	const { theme } = props

	const springConfig = { stiffness: 30, duration: 0 }
	const [color, setColor] = useState('white')
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
				<ThemeProvider
					theme={{
						...ChakraTheme,
						colors: {
							...ChakraTheme.colors,
							black: theme.bg,
							white: theme.fg,
						},
					}}>
					<ColorModeProvider>
						<CSSReset config={config} />
						<DarkMode>
							<MotionFlex
								key={router.route}
								initial="initial"
								animate="animate"
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

WApp.getInitialProps = async (appContext) => {
	console.log(await getTheme())

	const appProps = await App.getInitialProps(appContext)

	const theme = await getTheme()

	return { ...appProps, props: { hi: 'hi', theme } }
}

export default WApp
