// my-theme-preset.js

// my-theme-preset.js

module.exports = {
    theme: {
      extend: {
        
        textColor: {
            colorDefault: "#BB0000",
          },
        
        // Override Venia's default font family
        
        // Extend Venia's backgroundColor and borderRadius styles
        backgroundColor: theme => ({
            body: '#FFF',
            header: 'rgb(255 247 237)',
            subtle: theme('colors.gray.20'),
            disabledTile: '#f5f5f5'
        }),
       
                
        borderRadius: {
          radius4: "50%",
        },
      },
    },
  };
  