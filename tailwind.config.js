const { nextui } = require("@nextui-org/react");
import animations from '@midudev/tailwind-animations'
module.exports = {
  content: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  lightMode: "class",
  plugins: [nextui(), animations],
}
