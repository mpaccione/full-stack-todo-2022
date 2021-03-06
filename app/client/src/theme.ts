interface Theme {
    [index: string]: string
}

const primary:Theme = {
    primary1: 'hsl(220, 98%, 61%)', // Bright Blue
    primaryGradient: 'linear-gradient(135deg, hsl(192, 100%, 67%) 0%, hsl(280, 87%, 65%) 100%)' // Check Background
}

const light:Theme = {
    color1: 'hsl(0, 0%, 98%)',   // Very Light Gray
    color2: 'hsl(236, 33%, 92%)', // Very Light Grayish Blue
    color3: 'hsl(233, 11%, 84%)', // Light Grayish Blue
    color4: 'hsl(236, 9%, 61%)',  // Dark Grayish Blue
    color5: 'hsl(235, 19%, 35%)', // Very Dark Grayish Blue
}

const dark:Theme = {
    color1: 'hsl(235, 21%, 11%)', // Very Dark Blue
    color2: 'hsl(235, 24%, 19%)', // Very Dark Desaturated Blue
    color3: 'hsl(234, 39%, 85%)', // Light Grayish Blue
    color4: 'hsl(236, 33%, 92%)', // Light Grayish Blue (hover)
    color5: 'hsl(234, 11%, 52%)', // Dark Grayish Blue
    color6: 'hsl(233, 14%, 35%)', // Very Dark Grayish Blue
    color7: 'hsl(237, 14%, 26%)', // Very Dark Grayish Blue
}

export default {
    dark: { ...dark, ...primary },
    light: { ...light, ...primary },
    primary
}

