module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily : {
            display : ['Open sans', 'sans-serif'],
            body: ['Open Sans', 'sans-serif'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            pona: ['Ponnala'],
        },
        extend: {
            fontSize: {
                14: '14px'
            }, 
            colors : {
                'main-blue' : '#1A75FF',
                'secondary-blue' : '#2681D4',
                
            },
            padding: {
                '1/3' : '33,333333%',
                '2/3' : '66,666666%'
            },
            backgroundColor: {
                'main-bg' : '#FAFBFB',
                'main-dark-bg' : '#20232A',
                'secondary-dark-bg': '#33373E',
                'light-gray': '#F7F7F7',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
                'main-blue': '#1A75FF',
                'secondary-blue': '#005ECC',
            },
            borderWidth: {
                1 : '1px',
            },
            transistion : {
                '25' : 'transform 0.25s'
            },
            borderColor : {
                400: '400px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
            }, 
            height: {
                80: '80px',
            },
            backgroundImage: {
                'login-right': "url('/src/data/images/loginLeftBg.png')",
                'main-icon': "url('/src/data/iamges/a.png')",
                'course-bg-icon': "url('/src/data/images/module/corner.svg')",
            },
            aspectRatio: {
                '4/3': '4 / 3',
            }
        }
    },
}