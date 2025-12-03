export const DeckIndex = {
    Main: {
        displayName: 'Main Deck',
        deck: await import('./mainDeck.json'),
        key: 'Main'
    },
    XXX: {
        displayName: 'XXX',
        deck: await import('./xxxDeck.json'),
        key: 'XXX'
    },
    Friendship: {
        displayName: 'Friendship Edition',
        deck: await import('./friendshipDeck.json'),
        key: 'Friendship'
    }
} as const;