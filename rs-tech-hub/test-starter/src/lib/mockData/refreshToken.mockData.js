"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockRefreshTokens = getMockRefreshTokens;
function getMockRefreshTokens(now, expirationPeriod) {
    const mockRefreshTokens = [
        {
            id: 'cmaxm5tjj000lelj4ngiadc9y',
            token: '1d6af591-61a1-4b0f-a70d-5816680c3fbf',
            userId: 'cmaxm5tj3000helj4ck4g8pf8',
            revoked: false,
            replacedByToken: null,
            expiresAt: new Date(now.getDate() + expirationPeriod),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'cmaxm5tmm000telj4lv31ohnw',
            token: '589b0e8a-6629-458c-ae95-be1dd0d6d9d2',
            userId: 'cmaxm5tm6000pelj4sesm2ywn',
            revoked: false,
            replacedByToken: null,
            expiresAt: new Date(now.getDate() + expirationPeriod),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'cmaxm5tpx0011elj4ixobg95m',
            token: '9264cfac-a647-4159-af6d-37560cad8b66',
            userId: 'cmaxm5tph000xelj4unnrhfyy',
            revoked: false,
            replacedByToken: null,
            expiresAt: new Date(now.getDate() + expirationPeriod),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'cmaxm5tsz0019elj4bzryfpjs',
            token: 'eb7f0f43-84b8-48cd-9039-1eea77d8b69d',
            userId: 'cmaxm5tsm0015elj4c21cyyu9',
            revoked: false,
            replacedByToken: null,
            expiresAt: new Date(now.getDate() + expirationPeriod),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'cmaxm5tvr001helj4iutgp5c2',
            token: 'a16b3f99-7769-466d-8200-c6fa62446afc',
            userId: 'cmaxm5tvf001delj4ta4uxrcp',
            revoked: false,
            replacedByToken: null,
            expiresAt: new Date(now.getDate() + expirationPeriod),
            createdAt: now,
            updatedAt: now,
        },
    ];
    return mockRefreshTokens;
}
