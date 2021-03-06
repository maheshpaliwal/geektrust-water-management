module.exports = {
    PRICES: {
        CORPORATION_WATER_PRICE: 1,
        BOREWELL_WATER_PRICE: 1.5,
        TANKER_WATER_PRICE: {
            SLAB_FIVE_HUNDRED: 2,
            SLAB_FIFTEEN_HUNDRED: 3,
            SLAB_THREE_THOUSAND: 5,
            SLAB_THREE_THOUSAND_PLUS: 8
        },

    },
    TANKER_SLAB_LENGTH: 4,
    TANKER_SLAB_WIDTH: {
        SLAB_FIVE_HUNDRED: 500,
        SLAB_FIFTEEN_HUNDRED: 1000,
        SLAB_THREE_THOUSAND: 1500,
    },
    SLAB_INDEX_TO_SLAB_MAPPING: {
        0: 'SLAB_FIVE_HUNDRED',
        1: 'SLAB_FIFTEEN_HUNDRED',
        2: 'SLAB_THREE_THOUSAND',
        3: 'SLAB_THREE_THOUSAND_PLUS'
    },
    COMMANDS: {
        ALLOT_WATER: 'ALLOT_WATER',
        ADD_GUESTS: 'ADD_GUESTS',
        BILL: 'BILL'
    },

    COMMAND_INDEX: {
        COMMAND_NAME: 0,
        NUMBER_ARGUMENT: 1,
        WATER_FACTOR: 2
    },

    APPARTMENT_TYPE: {
        2: 'TWO_BHK',
        3: 'THREE_BHK',
    },

    APPARTMENT_TYPE_TO_NUMBER_OF_MEMBERS: {
        TWO_BHK: 3,
        THREE_BHK: 5
    },
    PER_PERSON_CAPACITY: 10,
    DEFAULT_DAYS: 30,

}