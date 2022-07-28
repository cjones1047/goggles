# Goggles

1) User navigates to webpage and sees a layout with the name of the game (Goggles), a play button on the bottom, and a summary of the game between the play button and the title. The summary says:

2) 'Welcome to Goggles, a game kinda like charades where you will be using what you see to guess a secret word. But unlike charades, you will be looking at pictures as your hints instead of crazy gestures. The secret word will ALWAYS be a SINGULAR NOUN.Hit the button below to get started!'

![ReadMe](/readme-wireframes/wireframe-1.png)

3) After hitting play, page transitions into 6 image boxes (5 of which are grayed out) with the first image box showing a visual hint. There is an input field at the bottom with a placeholder saying "What word comes to mind?" as well as a label saying "Enter guess below". Submit button is situated on right of input field.

![ReadMe](/readme-wireframes/wireframe-2.png)

4) In the event that your first guess is wrong, page will transition into showing you the second hint in the second image box while preserving the first hint. The input field's label flips and changes with each guess to show you your previous guesses.

![ReadMe](/readme-wireframes/wireframe-3.png)

5) The process described in item 4 above repeats until your third wrong guess, at which point another hint shows up in the form of the input field's placeholder. This new hint is the first letter of the secret word with all remaining characters asterisked out.

![ReadMe](/readme-wireframes/wireframe-4.png)

6) If you use all 6 guesses and don't get the secret word, the entire page while change to show you a 'game-over' animation with a button to play again. The 'play again' button will redirect you to the initial page described in item 1

![ReadMe](/readme-wireframes/wireframe-5.png)

7) If you guess the right secret word, you win. A play again button shows up with a celebratory animation that also tells you how many words there are left to guess. Every time you guess a word correctly, that word is deleted from the initial word list and the entire new word list is stored as an array inside of a session variable. You can refresh at any point to go back to the initial screen in item 1, win a game and then keep losing, or keep winning. Regardless, as long as your tab stays open the game will track how many words you got right and never give you those words again.

![ReadMe](/readme-wireframes/wireframe-6.png)