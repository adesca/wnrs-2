export const DeckIndex = {
    XXX: {
        displayName: 'XXX',
        deck: await import('./xxxDeck.json'),
        key: 'XXX'
    },
    Main: {
        displayName: 'Main Deck',
        deck: await import('./mainDeck.json'),
        key: 'Main'
    }
} as const;