class ApiController < ApplicationController
    def create_room
        VideoInfo.provider_api_keys = { youtube: ENV["YOUTUBE_API_KEY"] }
        video = VideoInfo.new(params[:video_url])

        room = Room.new
        room.room_id = IdGenerator.generate
        room.video_url = params[:video_url]        
        room.title = video.title
        room.host = "김아무개"       #=> devise 적용 후 수정할 것 current_user 
        room.save
        print params
        redirect_to "/chat/#{room.room_id}"
    end
end