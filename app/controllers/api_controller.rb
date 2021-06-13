class ApiController < ApplicationController
    def create_room
        room = Room.new
        room.room_id = IdGenerator.generate
        room.video_url = params[:video_url]
        room.title = 
        room.host = 
        room.save
        print params
        redirect_to "/chat/#{IdGenerator.generate}"
    end
end