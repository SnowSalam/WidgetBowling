export default class Api {
    constructor(pointId, baseUrl, session_id){
        this.session_id = `session_${Date.now()}_${Math.random()}`;
        this.baseUrl = 'https://app.remarked.ru/api/v1/ApiReservesWidget';
        this.token = this.getToken(pointId);
    }

    async post(body) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message || 'API error');
        }

        return data;
    }

    // нужно будет создать отдельный поинт для виджета
    async getToken(pointId) {
        const data = await this.post({
            method: 'GetToken',
            point: pointId,
            request_id: Date.now(),
            session_id: this.session_id,
        });

        this.token = data.token;
        return data.token;
    }

    async getGuestTags() {
        return this.post({
            method: 'GetGuestsTags',
            token: this.token,
            request_id: Date.now(),
        });
    }

    async getFreeDays(from, to, guestsCount) {
        const data = await this.post({
            method: 'GetDaysStates',
            token: this.token,
            reserve_date_period: { from, to },
            guests_count: guestsCount,
        });

        return data.slots || {};
  }

    async getTimeSlots(params = {}) {
        
        const body = {
            token: this.token,
            method: 'GetSlots',
            reserve_date_period: { from: params.date, to: params.date },
            guests_count: params.guests_count,
            request_id: Date.now(),
            session_id: this.session_id,
            ...(Object.hasOwn(params, 'roomId') && { roomId: params.roomId }),
            ...(Object.hasOwn(params, 'with_rooms') && { with_rooms: params.with_rooms }),
            ...(Object.hasOwn(params, 'duration') && { duration: params.duration }),
        };

        return this.post(body);
    }

    async createReserve(reserve) {
        return this.post({
            method: 'CreateReserve',
            token: this.token,
            request_id: Date.now(),
            session_id: this.session_id,
            site_url: window.location.href,
            reserve,
        });
    }
}