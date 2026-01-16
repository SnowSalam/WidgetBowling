export default class WidgetAPI {
    constructor(pointId, baseUrl, session_id){
        this.token = this.getToken(pointId);
        this.session_id = `session_${Date.now()}_${Math.random()}`;
        this.baseUrl = baseUrl;
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

    async getTimeSlots({
                            date,
                            guestsCount,
                            mode = 'times', // times | slots | slots-range
                            roomId,
                            withRooms = false,
                            duration,
                        }) {
        const body = {
            token: this.token,
            request_id: Date.now(),
            session_id: this.session_id,
        };

        if (mode === 'times') {
            body.method = 'GetTimes';
            body.reserve_date = date;
            body.guests_count = guestsCount;
        }

        if (mode === 'slots') {
            body.method = 'GetSlots';
            body.reserve_date_period = { from: date, to: date };
            body.guests_count = guestsCount;
            if (roomId) body.room_id = roomId;
            if (withRooms) body.with_rooms = true;
            if (duration) body.slot_duration = duration;
        }

        if (mode === 'slots-range') {
            body.method = 'GetTimeSlots';
            body.reserve_date = date;
            body.guests_count = guestsCount;
        }

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